import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "danger" | "outline" | "black";

type ButtonSize = "xs" | "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    sz?: ButtonSize;
    full?: boolean;
};

const Button = (props: ButtonProps) => {
    const {
        variant = "outline",
        sz = "md",
        full = false,
        className,
        children,
        ...rest
    } = props;

    let variantClassNames = "";
    let sizeClassNames = "";
    const fullWidth = full ? "w-full" : "";

    switch (variant) {
        case "primary":
            variantClassNames = "text-white bg-primary hover:bg-opacity-90";
            break;
        case "danger":
            variantClassNames = "text-white bg-danger hover:bg-opacity-90";
            break;
        case "outline":
            variantClassNames =
                "text-black bg-white border border-solid border-[#E5E7EB] hover:bg-slate-100 shadow-sm";
            break;
        case "black":
            variantClassNames = "text-white bg-black hover:bg-opacity-90";
            break;
        default:
            variantClassNames = "text-black bg-white hover:bg-opacity-90";
            break;
    }

    switch (sz) {
        case "xs":
            sizeClassNames = "text-xs px-4 py-2 rounded-md";
            break;
        case "sm":
            sizeClassNames = "text-sm p-[7px] rounded-md";
            break;
        case "lg":
            sizeClassNames = "text-base p-4 rounded-xl";
            break;
        default:
            sizeClassNames = "text-base p-2 rounded-lg";
            break;
    }

    return (
        <button
            className={`inline-flex justify-center items-center font-bold disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer transition-all duration-300 ${variantClassNames} ${sizeClassNames} ${fullWidth} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
