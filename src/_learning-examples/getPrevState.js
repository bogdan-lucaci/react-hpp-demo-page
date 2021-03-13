const App3 = () => {
    const [randomNum, setRandomNum] = useState('');
    const [prevNum, setPrevNum] = useState('');

    const handleChange = () => {
        setRandomNum((randomNum) => {
            // setState receives current state obj ('randomNum' in our example.) as param
            setPrevNum(randomNum); // <- save current val as prev val
            return Math.floor(Math.random() * 15) // <- next val
        })
    };

    useEffect(() => {
        handleChange();
    }, []);

    return (
        <div>
            <span><em>[ with function components + hooks ] </em></span>
            <h2>{randomNum}</h2>
            <button onClick={handleChange}>New Number</button>
            <button onClick={() => alert(prevNum)}>Previous Number</button>
        </div>
    );
};

class App2 extends React.Component {
    state = {
        randomNum: '',
        previousNum: ''
    }

    componentDidMount() {
        this.getNewRandomNum();
    }

    getNewRandomNum = () => {
        let randomNum = Math.floor(Math.random() * 15)
        this.setState((state) => (  // this is the current state
            {
                previousNum: state.randomNum, // this will be the previous randomNumber
                randomNum
            }));
        console.log(randomNum);
    }

    prevNum = () => {
        alert(this.state.previousNum); // put whatever code you need here
    }

    render() {
        return (
            <div>
                <span><em>[ with classes ] </em></span>
                <h2>{this.state.randomNum}</h2>
                <button onClick={this.getNewRandomNum}>New Number</button>
                <button onClick={this.prevNum}>Previous Number</button>
            </div>
        );
    }
}