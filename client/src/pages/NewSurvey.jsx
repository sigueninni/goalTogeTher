import '../css/page/newsurvey.css';

function NewSurvey() {


    return (
        <div className="newSurvey">
            <h1 className="newSurveyTitle">New Survey</h1>
           <form className="newSurveyForm" >   {/*onSubmit={onGrantOpiID} */}
            <div className="newSurveyItem">
                    <label>Survey Title</label>
                    <input name="title" type="text" placeholder="Title of your Survey" required={true}/>
                </div>

                <div className="newSurveyItemQuestion">
                    <label>Question 1</label>
                    <input name="question" type="text" placeholder="Survey question" required={true}/>
                </div>

                <button className="newSurveyButton" type="submit">Create Survey</button>
            </form>
        </div>
    );
}

export default NewSurvey;