import { useState, useContext, useEffect } from 'react';
import * as React from 'react';
import axios from 'axios';
import { UserContext, UserContextType } from '../App';
import AffirmationEntry from '../pages/AffirmationEntry'

const AffirmationEntries = () => {
    const [retrievedAffirmations, setRetrievedAffirmations] = useState<string[]>([]);
    const { userName, userId }: UserContextType = useContext(UserContext) ?? {userName: null, userId: null};


        const viewAffirmations = () => {
      axios
        .get(`/affirmations/retrieve/${userId}`)
        .then(({ data }) => {
          setRetrievedAffirmations(data);
          // localStorage.setItem('retrievedAffirmations', JSON.stringify(data));

        })
        .catch((err) => console.log(err));
    };

        useEffect(() => {
      viewAffirmations();
    }, []);


    return (
        <div>
             {retrievedAffirmations.map((entry: any) => (
             <AffirmationEntry key={entry.user_id} user={entry.user_id} entryId={entry.id} title={entry.title} favorite={entry.favorite} affirmations={entry.affirmationList.split('/n')}  />))}

        </div>
    );
}

export default AffirmationEntries;
