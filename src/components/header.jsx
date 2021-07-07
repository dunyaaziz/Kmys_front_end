import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = (props) => {
  const { t } = useTranslation();
  const { isLoggedIn }= useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,

}));

let links = (
  <>
 <Link className="btn btn-custom btn-lg page-scroll" to="/signup">
                  {t('Signup for Download')}
        </Link>
  </>
);
if (isLoggedIn) {
  links = (
    <>
   <Link className="btn btn-custom btn-lg page-scroll" to="/downloadFile">
                    {t('Download')}
          </Link>
    </>
  )
}
return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
              
                  {links}
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
