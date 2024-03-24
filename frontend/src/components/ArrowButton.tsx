import { FC } from 'react';
import ArrowButtonProps from '~/interfaces/props/ArrowButtonProps';

const ArrowButton: FC<ArrowButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='
        h-12
        w-12
        bg-white
        text-primary
        shadow-xl
        text-xl
        bold
        rounded-full
        p-2
        duration-300
        active:scale-75
      '
    >
      { children }
    </button>
  )
}

export default ArrowButton;
