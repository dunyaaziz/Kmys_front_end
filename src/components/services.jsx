import { useTranslation } from 'react-i18next';

export const Services = (props) => {

  
  const { t } = useTranslation();

  return (
    <div id='services' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>{t('Our Services')}</h2>
          <p>
          Mevcut Kadromuz ile İnşaat, Mekanik Tesisat, Elektrik Tesisat, Altyapı ve Peyzaj Disiplinlerinde Hizmet Veriyoruz.
          </p>
        </div>
        <div className='row'> 
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-4'>
                  {' '}
                  <i className={d.icon}></i>
                    <h3>{d.name}</h3>
              <div className='list-style'>
                <div >
                  <ul>
                    {d
                      ? d.text.map((d, i) => (
                          <li key={`${d}-${i}`}>-{d}</li>
                        ))
                      : 'loading'}
                  </ul>
                </div>          
              </div>                 
                  </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  )
}
