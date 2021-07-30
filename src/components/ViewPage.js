import React, { useEffect, useContext } from "react";
import "../css/ViewPage.css";
import "antd/dist/antd.css";
import { connect, useDispatch } from 'react-redux';
import ViewCustomRange from "./ViewCustomRange";
import ViewCalendar from "./ViewCalendar";
import { UserContext } from "./context/UserContext"
import { refreshUser } from "../features/globalSlice"
import { toggleMode } from "../features/viewSlice";

class ViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.setTypeCustom = this.setTypeCustom.bind(this);
    this.setTypeDefault = this.setTypeDefault.bind(this);
  }

  setTypeCustom() {
    this.props.dispatch(toggleMode("custom-range"));
  }

  setTypeDefault() {
    this.props.dispatch(toggleMode("calendar"));
  }

  render() {
    const { mode } = this.props;
    return (
      <div className="viewpage page-content">
        <div className="viewpage__typeChoice">
          <button
            className={mode === "calendar" ? "current" : null}
            onClick={this.setTypeDefault}
          >
            Default Calendar
          </button>
          <button
            className={mode === "custom-range" ? "current" : null}
            onClick={this.setTypeCustom}
          >
            Custom Range
          </button>
        </div>
        <hr />
        <div className="viewpage__view">
          {mode === "calendar" ? <ViewCalendar /> : <ViewCustomRange />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.view.mode,
    user: state.global.user,
  };
}

export default connect(mapStateToProps)(ViewPage);

// function ViewPage(props) {
//   const dispatch = useDispatch()
//   const [userContext, setUserContext] = useContext(UserContext)

//   useEffect(() => {
//     fetch('/users/me', {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userContext.token}`,
//       }
//     })
//       .then(res => res.json())
//       .then(res => {
//         console.log("This is the useEffect method.")
//         console.log("This is the response: ", res)
//         dispatch(refreshUser(res))
//       });
//   }, []);

//   const setTypeCustom = () => {
//     dispatch(toggleMode("custom-range"));
//   }

//   const setTypeDefault = () => {
//     dispatch(toggleMode("calendar"));
//   }

//   return (
//     <div className="viewpage page-content">
//       <div className="viewpage__typeChoice">
//         <button
//           className={props.mode === "calendar" ? "current" : null}
//           onClick={setTypeDefault}
//         >
//           Default Calendar
//         </button>
//         <button
//           className={props.mode === "custom-range" ? "current" : null}
//           onClick={setTypeCustom}
//         >
//           Custom Range
//         </button>
//       </div>
//       <hr />
//       <div className="viewpage__view">
//         {props.mode === "calendar" ? <ViewCalendar /> : <ViewCustomRange />}
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     mode: state.view.mode,
//     user: state.global.user,
//   }
// }

// export default connect(mapStateToProps)(ViewPage);




// class ViewPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       refresh: false
//     };
//     this.setTypeCustom = this.setTypeCustom.bind(this);
//     this.setTypeDefault = this.setTypeDefault.bind(this);
//   }

//   static contextType = UserContext

//   componentDidMount() {
//     console.log(this.context.token);
//     fetch('/users/me', {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.context.token}`,
//       }
//     })
//       .then(res => res.json())
//       .then(res => {
//         console.log("This is the useEffect method.")
//         console.log("This is the response: ", res)
//         this.props.dispatch(refreshUser(res))
//         this.state.setState({ refresh: !this.state.refresh })
//       })
//   }

//   setTypeCustom() {
//     this.props.dispatch(toggleMode("custom-range"));
//   }

//   setTypeDefault() {
//     this.props.dispatch(toggleMode("calendar"));
//   }

//   render() {
//     const { mode } = this.props;
//     return (
//       <div className="viewpage page-content">
//         <div className="viewpage__typeChoice">
//           <button
//             className={mode === "calendar" ? "current" : null}
//             onClick={this.setTypeDefault}
//           >
//             Default Calendar
//           </button>
//           <button
//             className={mode === "custom-range" ? "current" : null}
//             onClick={this.setTypeCustom}
//           >
//             Custom Range
//           </button>
//         </div>
//         <hr />
//         <div className="viewpage__view">
//           {mode === "calendar" ? <ViewCalendar /> : <ViewCustomRange />}
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     mode: state.view.mode,
//     user: state.global.user,
//   };
// }

// export default connect(mapStateToProps)(ViewPage);
