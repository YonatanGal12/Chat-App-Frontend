import "./Field.css";

type FieldProps = 
{
    fieldName: string,
    setField: (value: string) => void
}

function Field(props: FieldProps)
{
    let whatToShow;

    switch(props.fieldName)
    {
        case "Password":
            whatToShow = <input type="password" onChange={e => props.setField(e.target.value)}required/>;
            break;
        case "Phone Number":
            whatToShow = <input type="text" placeholder="This field is optional." onChange={e => props.setField(e.target.value)}required/>;
            break;
        default:
            whatToShow = <input type="text" onChange={e => props.setField(e.target.value)}required/>;
            break;
    }

    return (
        <>
            <div className="field-container">
                <div className="label-container">
                    <label>{props.fieldName}</label>
                </div>
                <div className="input-container">
                    {whatToShow}
                </div>
            </div>
        </>
    );
}

export default Field