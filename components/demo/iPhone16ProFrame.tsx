import { ReactNode } from 'react'

interface iPhone16ProFrameProps {
  children: ReactNode
}

export function IPhone16ProFrame({ children }: iPhone16ProFrameProps) {
  return (
    <div className="relative mx-auto" style={{ width: '393px', height: '852px', overscrollBehavior: 'contain' }}>
      {/* iPhone 16 Pro Frame - Accurate Dimensions */}
      <div className="absolute inset-0 rounded-[60px] bg-[#1d1d1f] shadow-[0_0_0_14px_#1d1d1f,0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Screen bezel */}
        <div className="absolute inset-[3px] rounded-[57px] bg-black overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-[19px] z-50" />

          {/* Screen content - Prevent scroll propagation */}
          <div className="relative w-full h-full bg-white dark:bg-black overflow-hidden" style={{ overscrollBehavior: 'contain' }}>
            {children}
          </div>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute -left-[3px] top-[120px] w-[3px] h-[32px] bg-[#1d1d1f] rounded-l-md" />
      <div className="absolute -left-[3px] top-[170px] w-[3px] h-[62px] bg-[#1d1d1f] rounded-l-md" />
      <div className="absolute -left-[3px] top-[242px] w-[3px] h-[62px] bg-[#1d1d1f] rounded-l-md" />
      <div className="absolute -right-[3px] top-[210px] w-[3px] h-[82px] bg-[#1d1d1f] rounded-r-md" />
    </div>
  )
}
