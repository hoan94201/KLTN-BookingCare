import { ButtonHTMLAttributes } from "react";

import { positionEnum } from "@/components/constants/enum";

type StatusVariant = positionEnum;

type StatusSize = "xs" | "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant: StatusVariant | unknown;
    sz?: StatusSize;
    full?: boolean;
};

const Position = (props: ButtonProps) => {

    const {
        variant = positionEnum.DOCTOR,
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
        case positionEnum.PROFESSOR:
            variantClassNames = 'text-[#B91C1C]';
            variantText = 'Giáo sư';
            break;
        case positionEnum.ASSOCIATE_PROFESSOR:
            variantClassNames = ' text-green-700';
            variantText = 'Phó Giáo sư';
            break;
        case positionEnum.MASTER:
            variantClassNames = 'text-blue-600 ';
            variantText = 'Tiến sĩ';
            break;
        case positionEnum.DOCTOR:
            variantClassNames = 'text-blue-600 ';
            variantText = 'Bác sĩ';
            break;

        default:
            variantClassNames = 'text-black bg-white hover:bg-opacity-90';
            variantText = 'Bệnh nhân';
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

export default Position;
