import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconStyle = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3746090_psvf7b1sgi.js',
});
interface IProps {
  name: string;
  className?: string;
}
const IconFont = (props: IProps) => (
  <IconStyle type={`icon-${props.name}`} className={props.className} />
);

export default IconFont;
