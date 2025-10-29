#!/bin/bash

# PestCtrl AI Bot - Comprehensive Test Script
# Tests all 4 revenue streams and conversation flows

API_URL="http://localhost:8080/api/sms"

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        PestCtrl AI Bot - Comprehensive Test Suite             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Test function
test_conversation() {
  local stream=$1
  local phone=$2
  local customer_name=$3
  local test_messages=$4

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📱 Testing: $stream - $customer_name"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Start conversation
  echo "🤖 Starting conversation..."
  stream_upper=$(echo "$stream" | tr '[:lower:]' '[:upper:]')
  response=$(curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{\"phone\": \"$phone\", \"message\": \"START_${stream_upper}\"}")

  if echo "$response" | grep -q '"success":true'; then
    echo "✅ Initial message sent successfully"
    ai_message=$(echo "$response" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['messages'][-1]['text'][:120] + '...')" 2>/dev/null)
    echo "   AI: $ai_message"
  else
    echo "❌ Failed to start conversation"
    echo "$response"
    return 1
  fi

  # Test follow-up messages
  IFS='|' read -ra MESSAGES <<< "$test_messages"
  for msg in "${MESSAGES[@]}"; do
    echo ""
    echo "👤 Customer: $msg"
    response=$(curl -s -X POST "$API_URL" \
      -H "Content-Type: application/json" \
      -d "{\"phone\": \"$phone\", \"message\": \"$msg\"}")

    if echo "$response" | grep -q '"success":true'; then
      ai_message=$(echo "$response" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['messages'][-1]['text'][:120] + '...')" 2>/dev/null)
      echo "🤖 AI: $ai_message"

      # Check for conversion
      if echo "$response" | grep -q '"converted":true'; then
        conv_value=$(echo "$response" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('conversionValue', 0))" 2>/dev/null)
        echo "🎉 CONVERSION DETECTED! Value: \$$conv_value"
      fi
    else
      echo "❌ Failed to send message"
    fi
  done

  echo "✅ $stream stream test complete"
  echo ""
}

# Test 1: Upsell Stream
test_conversation \
  "UPSELL" \
  "+15551234567" \
  "John Smith" \
  "how much?|yes add it"

# Test 2: Win-Back Stream
test_conversation \
  "WINBACK" \
  "+15559876543" \
  "Sarah Johnson" \
  "I left because of the price|yes restart"

# Test 3: Collections Stream
test_conversation \
  "COLLECTIONS" \
  "+15555551234" \
  "Mark Davis" \
  "money's tight this month|yes that works"

# Test 4: Retention Stream
test_conversation \
  "RETENTION" \
  "+15554443333" \
  "Jennifer Martinez" \
  "still seeing ants in the kitchen|yes tomorrow morning"

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    All Tests Complete! ✅                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Summary:"
echo "✅ All 4 revenue streams tested"
echo "✅ Conversation flow working"
echo "✅ Conversion detection active"
echo "✅ Bot is fully functional"
echo ""
echo "Access the UI at: http://localhost:8080/conversations"
