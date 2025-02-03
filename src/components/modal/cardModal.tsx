import type React from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-green-200 rounded-lg p-6 max-w-md sm:max-w-lg w-11/12 sm:w-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    )
    

}

