import { ACTIONS } from './App'

function NumberButton ({dispatch, digit }) {
    return (<button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit }})}>
        {digit}
    </button>)
}
export default NumberButton