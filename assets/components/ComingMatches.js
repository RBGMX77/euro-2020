import { matches } from 'lodash-es';
import React from 'react';

const ComingMatches = ({data}) => {
    return ( 
        <div className="comingmatches">
            <h3 className="title is-3">Prochains matches</h3>
            {data.map(match => 
                <div className="content" key={match._id}>
                    <b>{match.date}</b>
                    <p>{match.hometeam} - {match.awayteam}</p>
                </div>
            )}
        </div>

     );
}
 
export default ComingMatches;