import { useParams } from 'react-router-dom';
import Brand from '../../../../pages/Home/components/Brand';
import Newsletter from '../../../../pages/Home/components/Newsletter';
import Information from '../components/Information';
import UpButton from '../components/UpButton';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface DefaultLayoutProps {
  keyword: string;
  setKeyword: (word: string) => void;
  children: React.ReactNode;
}

function DefaultLayout({ keyword, setKeyword, children }: DefaultLayoutProps) {
  return (
    <div className="wrapper">
      <Header keyword={keyword} setKeyword={setKeyword} />
      <Information />
      {children}
      <Brand />
      <Newsletter />
      <Footer />
      <UpButton />
    </div>
  );
}

export default DefaultLayout;
