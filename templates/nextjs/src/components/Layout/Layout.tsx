/*
 * Layout.tsx
 * author: evan kirkiles
 * created on Tue Oct 18 2022
 * 2022 the nobot space,
 */
import s from './Layout.module.scss';
import Image from 'next/image';
import LHS_IMG from '../../../public/images/lhs.png';
import RHS_IMG from '../../../public/images/rhs.png';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = function Layout({ children }) {
  return <div className={s.container}>{children}</div>;
};

export default Layout;
