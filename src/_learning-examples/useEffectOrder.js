import { useEffect, useState } from 'react';
const css = (borderColor) => ({ margin: '.5rem', padding: '.5rem', border: '2px dotted ' + borderColor });

/*========================================================================================*/
const Child1 = ({ myState1, setMyState1, myState2, setMyState2 }) => {
    const handleClick2 = (e) => setMyState2((prevState) => prevState + Math.floor(Math.random() * Math.floor(10)))
    // useEffect(() => {
    //     console.log('---> Child 1 useEffect');
    //     return (() => { console.log('---> Child 1 useEffect return'); })
    // });

    return (<div style={css('tomato')}>
        child 1
        <button onClick={handleClick2}>change STATE_2</button>&nbsp;
        <Child2 myState1={myState1} setMyState1={setMyState1} myState2={myState2} />
    </div>)
};
/*========================================================================================*/
    const Child2 = ({ myState1, setMyState1, myState2 }) => {
        
        // useEffect(() => {
        //     console.log('---> Child 2 useEffect');
        //     return (() => { console.log('---> Child 3 useEffect return'); })
        // });

        return (<div style={css('orange')}>
            child 2
            <Child3 myState1={myState1} setMyState1={setMyState1} myState2={myState2}/>
        </div>)
    };
/*========================================================================================*/
        const Child3 = ({ myState1, setMyState1, myState2 }) => {
            const [reason, setReason] = useState('');

            const handleChange = (e) => setMyState1((prevState) => {
                setReason('');
                return{...prevState, 'a': parseInt(e.target.value)}
            });

            useEffect(() => {
                // console.log('---> Child 3 useEffect');
                // return (() => { console.log('---> Child 4 useEffect return'); })
            });

            useEffect(() =>{
                if (((myState2 % 2 ) + 2 ) % 2 === 0) {
                    setReason('changed cause STATE_2 divides by 2');
                setMyState1((prevState) => ({ ...prevState, a: 'XXXX'/*prevState['a'] + Math.floor(Math.random() * Math.floor(10))*/ }));
                }
                else {
                    setReason('');
                }
            }, [myState2]);

            console.log(myState1);
            return (<div style={css('teal')}>
                child 3 <br /><br />
                {reason}<br />
                <input type="text" value={myState1['a'] || ''} onChange={handleChange} />
            </div>)
        };
/*========================================================================================*/        
const Child4 = ({ setMyState1, setMyState2 }) => {

    const handleClick1 = (e) => setMyState1((prevState) => ({ ...prevState, a: prevState['a'] + Math.floor(Math.random() * Math.floor(10)) }))
    const handleClick2 = (e) => setMyState2((prevState) => prevState + Math.floor(Math.random() * Math.floor(10)))
    const handleClick = () => { handleClick1(); handleClick2(); };

    // useEffect(() => {
    //     console.log('---> Child 4 useEffect');
    //     return (() => { console.log('---> Child 2 useEffect return'); })
    // });

    return (<div style={css('cyan')}>
        child 4 &nbsp;
        <button onClick={handleClick}>change STATE_1 & STATE_2</button>&nbsp;
    </div>)
};                
/*========================================================================================*/
const Parent = () => {
    const [myState1, setMyState1] = useState({ a: 100, b: 200 });
    const [myState2, setMyState2] = useState(500);
    useEffect(() => {
        console.log('-> Parent useEffect\n');
        return (() => { console.log('-> Parent useEffect return\n'); })
    }, [myState1]);
    return (
        (<div style={css('blue')}>
            Parent  &nbsp;&nbsp; | &nbsp;&nbsp; 
            STATE_2 : {myState2} &nbsp;
            - by 2 [ <b>{((myState2 % 2 ) + 2 ) % 2 === 0 ? 'YES' : 'NO'}</b> ]
            - by 4 [ <b>{((myState2 % 4 ) + 4 ) % 4 === 0 ? 'YES' : 'NO'}</b> ]
            &nbsp;&nbsp; | &nbsp;&nbsp; STATE_1 : <pre>{JSON.stringify(myState1, null, '  ')}</pre>
            <Child1 setMyState1={setMyState1} setMyState2={setMyState2} myState1={myState1} myState2={myState2} />
            <Child4 setMyState1={setMyState1} setMyState2={setMyState2} />
        </div>)
    )
}

export default Parent;