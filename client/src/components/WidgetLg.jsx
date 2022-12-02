import '../css/component/widgetLg.css'


function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Surveys interactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Title</th>
          <th className="widgetLgTh">Cost in OPI</th>
          <th className="widgetLgTh">Survey Sample</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Young people reading</span>
          </td>
          {/* <td className="widgetLgDate">14 January 2023</td> */}
          <td className="widgetLgAmount">100</td>
          <td className="widgetLgAmount">20</td>
          <td className="widgetLgStatus">
            <Button type="Draft" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fH"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Cinema entries </span>
          </td>
          {/* <td className="widgetLgDate">14 January 2023</td> */}
          <td className="widgetLgAmount">1000</td>
          <td className="widgetLgAmount">200</td>
          <td className="widgetLgStatus">
            <Button type="Ongoing" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fH"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Womand and sport</span>
          </td>
          {/* <td className="widgetLgDate">14 January 2023</td> */}
          <td className="widgetLgAmount">400</td>
          <td className="widgetLgAmount">100</td>
          <td className="widgetLgStatus">
            <Button type="Terminated" />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default WidgetLg;