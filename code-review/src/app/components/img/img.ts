import { div } from '@components/tags';

import styles from './img.module.scss';

interface Props {
  src?: string;
  alt?: string;
  className?: string;
}

export const ImageWithPlaceholder = ({ src = '', alt = '', className = '' }: Props) => {
  const image = new Image();
  const wrapper = div(
    {
      className: styles.placeholder,
    },
    image,
  );
  image.src = src as string;
  image.alt = alt as string;
  image.className = className as string;
  image.onload = () => wrapper.removeClass(styles.placeholder || '2');
  return wrapper;
};
