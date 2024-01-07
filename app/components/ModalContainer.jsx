import React from 'react'


export default function ModalContainer({children, handleModalClose}) {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-50"
      onClick={() => handleModalClose()}
    >
      <div
        className="flex md:w-[600px] flex-col gap-6 rounded-xl bg-white md:p-12 shadow-2xl p-5 m-5"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        </div>
    </div>

  )
}
