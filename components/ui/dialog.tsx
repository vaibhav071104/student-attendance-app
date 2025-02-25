import React from "react"

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {}
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}
interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(({ className, children, ...props }, ref) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`} {...props} ref={ref}>
      {children}
    </div>
  )
})
Dialog.displayName = "Dialog"

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={`p-4 ${className}`} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)
DialogContent.displayName = "DialogContent"

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)
DialogHeader.displayName = "DialogHeader"

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} ref={ref}>
        {children}
      </h3>
    )
  },
)
DialogTitle.displayName = "DialogTitle"

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p className={`text-sm text-muted-foreground ${className}`} {...props} ref={ref}>
        {children}
      </p>
    )
  },
)
DialogDescription.displayName = "DialogDescription"

