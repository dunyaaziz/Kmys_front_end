import React, { useEffect, useState } from 'react';
import { getUsers } from "../api/apiCalls";
import { useTranslation } from 'react-i18next'
import UserListItem from './UserListItem';
import { useApiProgress } from "../shared/ApiProgress";
import Spinner from './spinner';

 const UserList = () => {
     const[page, setPage] = useState({
        content:[],
        size:10,
        number:0
     });

     const [loadFailure, setLoadFailure] = useState(false);

const pendingApiCall = useApiProgress('get','/api/1.0/users?page');

     useEffect(()=>{
         loadUsers();
     }, []);

const onClickNext = () =>{
    const nextPage = page.number+1;
    loadUsers(nextPage);
}
const onClickPrevious= () =>{
    const previousPage = page.number-1;
    loadUsers(previousPage);
}
const loadUsers = async page => {
    setLoadFailure(false);
    try{
        const response= await getUsers(page); 
        setPage(response.data);
    }   catch(error){
        setLoadFailure(true);

    }
}

    const { t } = useTranslation();
    const { content : users, last, first } = page;
    // let actionDiv = (
    //     <div>
    //         {first === false && (<button className="btn btn-sm btn-light" onClick={onClickPrevious}>{t('Previous')}</button>)}
    //         {last === false && (<button className="btn btn-sm btn-light right" onClick={onClickNext}>{t('Next')}</button>)}
    //     </div> );

    let actionDiv = (<nav aria-label="...">
            <ul className="pager">
            {first === false && (<li className="previous"><a className="btn btn-sm btn-light" onClick={onClickPrevious}>{t('Previous')}</a></li>)}
            {last === false && (<li className="next"><a className="btn btn-sm btn-light" onClick={onClickNext}>{t('Next')}</a></li>)}
            </ul>
             </nav>);

        if(pendingApiCall){
            actionDiv = (<Spinner />)
        }
        return (
            <div className='container panel panel-default'>
                <h3 className='panel-heading text-center'>{t('Users')}</h3>
                <div className='list-group-flush'>
                  {users.map(user =>  (
                        <UserListItem key={user.username} user={user} />
                    ))}
                
                <div>
                    {actionDiv}
                    {loadFailure && <div className="text-center text-danger">{t('Load Failure')}</div>}
                </div>
            </div>
            </div>
        );
}

export default UserList;