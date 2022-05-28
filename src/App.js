import React, { useReducer } from "react";
import NumberButton from "./NumberButton";
import OperandButton from './OperandButton';

export const ACTIONS = {
   ADD_DIGIT:'add-digit',
   CHOOSE_OPERATION:'choose-operation',
   CLEAR:'clear',
   DELETE_DIGIT:'delete-digit',
   FINAL_OPERATION: 'final-operation'
 }

const reducer = (state, action) => {
  const { type, payload } = action
  const { currentOperand, previousOperand, operation } = state
  
  switch(type) {
    case ACTIONS.ADD_DIGIT: 
      if(state.overrule) {
        return {
          ...state,
          overrule:false,
          currentOperand: payload.digit
        }
      }
      if(payload.digit === '0' && currentOperand === '0') return state;
      if(payload.digit === '.' && currentOperand.includes('.')) return state;
      return {
        ...state,
        currentOperand: `${ currentOperand || ''}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(!currentOperand && !previousOperand) {
        return state
      }
      if (!currentOperand) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: currentOperand,
          currentOperand: null,
        }
      }
      return {
        ...state,
        previousOperand: evalueation(state),
        currentOperand:null,
        operation:payload.operation 
      }
    case ACTIONS.CLEAR: 
      return {};
    case ACTIONS.FINAL_OPERATION: 
      if(!currentOperand || !operation || !previousOperand) return state;
      return {
        ...state,
        overrule: true,
        operation: null,
        previousOperand: null,
        currentOperand: evalueation(state)
      }
    case ACTIONS.DELETE_DIGIT:
        if (!currentOperand  && !previousOperand) {
          return state
        }
        if (state.overrule) {
          return {
            ...state,
            overrule: false,
            currentOperand: null,
          }
        }
        if (currentOperand === null) return state
        if (currentOperand.length === 1) {
          return { ...state, currentOperand: null }
        }
  
        return {
          ...state,
          currentOperand: currentOperand.slice(0, -1),
        }
    // no default
  }
 }

function evalueation({currentOperand, previousOperand, operation}) {
  const current = parseFloat(currentOperand)
 const prev = parseFloat(previousOperand)
 if(isNaN(current) || isNaN(prev)) return '';
 let computation = ''
 switch (operation) {
   case '+' : computation = current + prev;
    break;
  case '-' : computation = prev - current;
    break;
  case '*' : computation = prev * current;
    break;
  case '÷' : computation =  prev / current;
    break;
  // no default
 }
 return computation.toString()
}

function App() {
  const [ { currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <>
    <h2 className="title">React Basic Calculator</h2>
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperandButton operation="÷" dispatch={dispatch}/>
      <NumberButton digit="1" dispatch={dispatch}/>
      <NumberButton digit="2" dispatch={dispatch}/>
      <NumberButton digit="3" dispatch={dispatch}/>
      <OperandButton operation="*" dispatch={dispatch}/>
      <NumberButton digit="4" dispatch={dispatch}/>
      <NumberButton digit="5" dispatch={dispatch}/>
      <NumberButton digit="6" dispatch={dispatch}/>
      <OperandButton operation="+" dispatch={dispatch}/>
      <NumberButton digit="7" dispatch={dispatch}/>
      <NumberButton digit="8" dispatch={dispatch}/>
      <NumberButton digit="9" dispatch={dispatch}/>
      <OperandButton operation="-" dispatch={dispatch}/>
      <NumberButton digit="." dispatch={dispatch}/>
      <NumberButton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.FINAL_OPERATION})}>=</button>
    </div>
    </>
  );
}

export default App;
