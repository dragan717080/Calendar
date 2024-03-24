import { FC } from 'react';
import LabelProps from '~/interfaces/props/LabelProps';

const Label: FC<LabelProps> = ({ id, children }) => {
  return (
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      { children }
    </label>
  )
}

export default Label;
