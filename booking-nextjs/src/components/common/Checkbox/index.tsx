
import { HTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type CheckboxProps = HTMLAttributes<HTMLElement> & {
  className?: string;
  label?: string;
  labelUrl?: {
    text: string;
    url: string;
  };
  id?: string;
  checked?: boolean;
  register?: UseFormRegisterReturn;
};

const Checkbox = ({
  checked = false,
  label,
  labelUrl,
  className,
  id,
  register,
  ...props
}: CheckboxProps) => {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={id}
          aria-describedby={id}
          name={id}
          type="checkbox"
          className={`h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary ${className}`}
          checked={checked}
          {...register}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        {labelUrl?.url ? (
          <label htmlFor={id} className="font-secondary">
            <a
              href={labelUrl?.url}
              target="_blank"
              className="text-blue-400 hover:underline">
              {labelUrl?.text}
            </a>
            {label}
          </label>
        ) : (
          <label htmlFor={id} className="font-secondary">
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
