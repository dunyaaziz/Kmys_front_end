import { useTranslation } from 'react-i18next';

export const About = (props) => {
  const { t } = useTranslation();

  return (
    <div id='about'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            {' '}
            <img src='img/about.jpg' className='img-responsive' alt='' />{' '}
          </div>
          <div className='col-xs-12 col-md-6'>
            <div className='about-text'>
              <h2>{t('ABOUT US')}</h2>
              <p>{props.data ? props.data.paragraph : 'loading...'}</p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
