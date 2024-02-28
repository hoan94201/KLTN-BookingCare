import { ButtonHTMLAttributes } from "react";

import { StatusComponent } from "@/components/constants/enum";

type StatusVariant = StatusComponent;

type StatusSize = "xs" | "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: StatusVariant | unknown;
    sz?: StatusSize;
    full?: boolean;
};

const Status = (props: ButtonProps) => {

    const {
        variant = StatusComponent.ADMIN,
        sz = "xs",
        full = false,
        className,
        children,
        ...rest
    } = props;
    let variantClassNames = "";
    let sizeClassNames = "";
    let variantText = "";
    const fullWidth = full ? "w-full" : "";

    switch (variant) {
        case StatusComponent.PATIENT:
            variantClassNames = "bg-[#FEE2E2] text-[#B91C1C] ring-red-600/20";
            variantText = "Patient";
            break;
        case StatusComponent.ADMIN:
            variantClassNames = "bg-green-50 ring-green-600/20 text-green-700";
            variantText = "Admin";
            break;
        case StatusComponent.DOCTOR:
            variantClassNames = "bg-blue-200 text-blue-600 ring-blue-600/20 ";
            variantText = "Doctor";
            break;

        default:
            variantClassNames = "text-black bg-white hover:bg-opacity-90";
            break;
    }

    switch (sz) {
        case "xs":
            sizeClassNames = "text-xs rounded-lg px-2 py-1";
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
        <span
            className={`inline-flex  items-center rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset  ${variantClassNames} ${sizeClassNames} ${fullWidth} ${className}`}
            {...rest}
        >
            {variantText}
        </span>
    );
};

export default Status;
