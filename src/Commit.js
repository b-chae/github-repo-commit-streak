import React from "react"
import PropTypes from "prop-types"

function Commit({commits}){

    let dates = {};
    let last_week = [];
    const last_week_day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0);
    const first_date = new Date(commits[commits.length-1]);
    const earliest = first_date.getTime() + first_date.getTimezoneOffset()*60*1000;
    var longest = Math.ceil((today.getTime() - earliest)/(1000*60*60*24))

    for(var i=0; i<=longest; i++){
        dates[i] = 0;
    }

    for(i=0; i<commits.length; i++){
        const now = new Date(commits[i])
        var idx = Math.ceil((today.getTime() - now.getTime())/(1000*60*60*24))
        dates[idx]++;
    }

    var flag = false;
    var streak = 1;
    var current_streak = 1;
    var longgest_streak = 1;
    var longgest_day;

    for(i=1; i<commits.length; i++){
        if(dates[i] > 0) streak++;
        else{
            if(!flag){
                current_streak = streak;
                flag = true;
                longgest_streak = streak;
                longgest_day = today.getTime() - (streak-1)*24*60*60*1000;
            }
            else{
                if(longgest_streak < streak){
                    longgest_streak = streak;
                    longgest_day = today.getTime() - (streak-1)*24*60*60*1000;
                }
            }
            streak = 0;
        }
    }

    var week1ago = 0;
    var week2ago = 0;
    var week3ago = 0;
    const weekofday = today.getDay();
    console.log(weekofday)
    const thisweekdate = new Date(today.getTime() - weekofday*24*60*60*1000);

    for(i=0; i<=weekofday && i<Object.keys(dates).length; i++){
        last_week.push(dates[i])
        week1ago += dates[i];
    }
    for(i=weekofday+1; i<weekofday+8 && i<Object.keys(dates).length; i++){
        week2ago += dates[i];
    }
    for(i=weekofday+8; i<weekofday+15 && i<Object.keys(dates).length; i++){
        week3ago += dates[i];
    }

    longgest_day = new Date(longgest_day)
    const longgest_day_end = new Date(longgest_day.getTime() + (longgest_streak-1)*24*60*60*1000);

    return (
    
    <div className="commit">
        <div className="current_streak">
            {dates[0] > 0 ? 
                <h2>My current streak : {current_streak} ✅</h2> : 
                <h2>My current streak : {current_streak-1} 🥺</h2>}
        </div>
        <div>
            {dates[0] > 0 ? 
                <h3 className="border_round">You're done with {current_streak} streak ❗️</h3> : 
                <h3 className="border_round">Let's keep up with {current_streak} streak 🔥</h3>}
        </div>
        <div className="longgest_streak">
            <h2>My longgest streak : {longgest_streak}</h2>
            <h3 className="date_detail">{longgest_day.toDateString()} - {longgest_day_end.toDateString()}</h3>
        </div>
        <div className="compare week">
            <h3>This week [{thisweekdate.toDateString()} - Today] : {week1ago}</h3>
            <h3>Last week [{new Date(thisweekdate.getTime() - 7*24*60*60*1000).toDateString()}- {new Date(thisweekdate.getTime() - 1*24*60*60*1000).toDateString()}] : {week2ago}</h3>
            <h3>2 weeks ago [{new Date(thisweekdate.getTime() - 14*24*60*60*1000).toDateString()}- {new Date(thisweekdate.getTime() - 8*24*60*60*1000).toDateString()}]: {week3ago}</h3>
        </div>
        <h3 className="border_round">My recent commits 📝</h3>
        <div className="history">
            {last_week.map((commit, index)=>(
                <div className="box">
                    <h3 key={index}>{commit}</h3>
                </div>
            ))}
        </div>
        <div className="history">
            {last_week_day.map((day, index)=>(
                <div className="box">
                <h3 key={index}>{last_week_day[6-index]}</h3>
            </div>
            ))}
        </div>
    </div>
    );
}

Commit.propTypes ={
    commits : PropTypes.array.isRequired,
}

export default Commit;