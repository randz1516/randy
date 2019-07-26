import React from 'react';
import Quest from './questions';
import Progress from './Loader';
import './New.css'

class App extends React.Component{
    state =  {
        userGuess: null,
        currentQuestionId: 1,
        Options: [],
        Score: 0,
        Loading: false,
        dis: false,
        color: '',

    }
        quiz = () =>{
            const {currentQuestionId} = this.state;
            this.setState(() => {
                return{
                    Question: Quest[currentQuestionId].Question,
                    Options: Quest[currentQuestionId].Options,
                    Answer: Quest[currentQuestionId].Correct
                }
            })
        }

    componentDidMount(){
        this.quiz();
    }
     
        componentDidUpdate = (prevProps, prevState) =>{
            if(this.state.currentQuestionId !== prevState.currentQuestionId)
                {this.setState({Loading:true});
                setTimeout(() => {
                    this.setState({Loading:false}, () => this.quiz());
                }, 2000);
            }
            }
            NextQuestion = () =>{ 
                const {currentQuestionId}=this.state
                    this.setState({
                        currentQuestionId: currentQuestionId + 1
                    })
                }
    renderChoices = () => {
        const { Options, Answer} = this.state; 
        const defaultstyle = {
            height:'100px',
            width:'100px',
            boxShadow: '5px 5px black'
        }
        return Options.map((option, i) => {
            this.renderButton(option, {
                defaultstyle,
            })
            // if ( option === Answer){
            // return this.renderButton(option, {backgroundColor: "green", 
            // height: '100px', 
            // width: '100px', 
            // boxShadow: '5px 5px black', 
            // margin: '10px', 
            // border: '5px double grey'}, i);
            // }else{
            // return this.renderButton(option, {backgroundColor: "red", 
            // height: '100px', 
            // width: '100px', 
            // boxShadow: '5px 5px black', 
            // margin: '10px', 
            // border: '5px double grey'}, i);
            // }
        })
    }
    renderButton = (choice, color, key) => {
        return (
            <button className = 'btn-answer' style={color} 
            key={key}
            disabled={this.Loading}
            onClick={this.NextQuestion}>
            {choice}{this.state.Loading && <Progress/>}
            </button>
        )
    }
    render(){
        const {
            Question, 
            currentQuestionId, 
        } = this.state
        return(
            <div>
                <span>This Question is {currentQuestionId} out of {Quest.length -1}</span>
                <div><h1>These are Random Questions </h1></div>
                {Question}
                <br/>
                <ul>
                {this.renderChoices()}
                </ul>
                <div>Your Score is {this.state.Score}/10</div>
                {currentQuestionId === Quest.length -1 && 
                <button> 
                Finish Quiz
                </button>
                }   
            </div>
        )
    }
}

export default App;

        //   {/* {Options.map((options,i) => 
        //         (
        //             <p className='Buttons' key={i} style={{display:'inline'}}>
        //                 <button className='btn-color' disabled={Loading} 
        //                 onClick={() => this.NextQuestion(options)} 
        //                 style={Answer ? style:null}>
        //                 {options}{Loading && <Progress/>}
        //                 </button>  
                                        
        //             </p>
        //         ))
        //         } */}

        // if(userGuess === Answer) {
        //     this.setState({
        //         Score: Score + 1,
        //         color: '#53CC4D',
        //         CorrectAnswer: true,
        //     });
        //   console.log('Your Answer is ' + userGuess + 'and you got the Right Answer')
        // }else{ 
        //     this.setState({
        //         color: '#F0231F',
        //         CorrectAnswer: true
        //     })
        //   console.log('Your ' + userGuess +' But the Answer is Wrong the Correct answer is ' + Answer)
        // } 