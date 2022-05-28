import { ACTIONS } from './App'
function OperandButton ({dispatch, operation }) {

    return (<button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
        {operation}
    </button>)
}
export default OperandButton