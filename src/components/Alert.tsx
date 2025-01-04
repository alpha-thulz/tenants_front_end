import {ReactNode} from "react";

interface AlertProps {
    children: ReactNode;
    color?: "primary" | "success" | "warning" | "danger" | "info";
    onClose?: () => void;
}

export default function Alert({ children, color = "primary", onClose }: AlertProps) {
    return (
        <div className={`alert alert-${color} alert-dismissible fade show`} role="alert">
            {children}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    onClick={onClose}></button>
        </div>
    );
}