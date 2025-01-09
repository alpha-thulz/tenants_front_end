interface ButtonProps {
    label: string;
    color?: "primary" | "success" | "warning" | "danger" | "info";
    onClick: () => void;
    className?: string;
}

export default function Button({ label, color="primary", onClick, className }: ButtonProps) {
    return (
        <button type="button" onClick={onClick} className={`btn btn-outline-${color} ${className}`} >{label}</button>
    );
}