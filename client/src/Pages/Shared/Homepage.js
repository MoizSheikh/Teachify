import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HiArrowDown } from "react-icons/hi";

export default function Homepage() {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const navigateToSignIn = () => {
    navigate("/login");
  };
  return (
    <div className="homepage">
      <div className="patch1"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <div className="patch5"></div>
      <div className="patch4 patch6"></div>
      <div className="patch5 patch7"></div>
      <div className="patch8"></div>
      <div className="patch4 patch9"></div>
      <div className="patch5 patch10"></div>
      <div className="patch4 patch6 patch11"></div>
      <div className="patch5 patch12"></div>
      <div className="patch13"></div>
      <div className="patch14"></div>
      <div className="patch4 patch6 patch15"></div>
      <div className="patch5 patch16"></div>
      <div className="patch17"></div>
      <div className="patch14 patch18"></div>
      <div className="part1">
        <div className="navbar">
          <div onClick={() => navigate("/")} className="MainLogo">
            <img className="Logoimage" src={"/logo.jpg"} alt="logo" />
          </div>
          <div className="navBtns">
            <Button
              className="signBtn"
              variant="text"
              onClick={navigateToSignIn}
            >
              Sign In
            </Button>
            <Button
              className="joinBtn"
              variant="contained"
              onClick={navigateToSignUp}
            >
              Join
            </Button>
          </div>
        </div>

        <div className="part1Content">
          <div className="data">
            <div className="detailCon">
              <div className="heading">
                For Each Student, For Each Classroom. True Outcomes.
              </div>
              <div className="detail">
                Our mission is to provide world-class education, anytime, for
                everyone.
              </div>
            </div>
          </div>
        </div>
        <button className="downBtn">
          <HiArrowDown className="downIcon" />
        </button>
      </div>
      <div className="part2">
        <div className="heading">
          The Way <span>Its Easy</span> Works
        </div>
        <div className="contentCon">
          <div className="Con">
            <div className="data">
              <div className="main">Personalized apprenticeship</div>
              <div className="detail">
                Students train at their own pace, filling in holes in their
                understanding first and then speeding up their learning.
              </div>
            </div>
          </div>
          <div className="Con">
            <div className="data">
              <div className="main">Content Trusted</div>
              <div className="detail">
                Its easy collection of trusted teachers, developed by experts,
                covers upper secondary school and higher education.
              </div>
            </div>
          </div>
          <div className="Con">
            <div className="data">
              <div className="main">Instruments to inspire teachers</div>
              <div className="detail">
                With Its easy, teachers can detect holes in the knowledge of
                their students, modify teaching, and meet every student's needs.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="part3">
        <div className="Con3">
          <img className="image" src={"/logo.jpg"} alt="logo" />
        </div>
        <div className="Con3">
          <div className="heading">
            Mix And Match The Education And Get Each Student Engaged.
          </div>
          <div className="detail">
            We offer support to each teacher to empower their entire
            classroom.Many students need your guidance if you are a student with
            high school grades. Make money by teaching the knowledge to others.
            The price of your expertise is determined by you.
          </div>
          <div className="BtnCon">
            <Button
              className="startBtn"
              variant="contained"
              onClick={navigateToSignUp}
            >
              Start Here
            </Button>
          </div>
        </div>
      </div>
      <div className="part3 part4">
        <div className="Con3 Con4">
          <div className="innerCon4">
            <div className="heading">You Can Learn Anything.</div>
          </div>
          <div className="detail">
            Develop a deep, strong understanding of the subjects of mathematics,
            science, Norwegian and many others.
          </div>
          <div className="BtnCon">
            <Button
              className="startBtn"
              variant="contained"
              onClick={navigateToSignUp}
            >
              Students, start here
            </Button>
          </div>
        </div>
        <div className="Con3">
          <img className="image" src={"/logo.jpg"} alt="logo" />
        </div>
      </div>
      <div className="part5">
        <div className="heading">Its Easy Join today</div>
        <Button
          className="startBtn"
          variant="contained"
          onClick={navigateToSignUp}
        >
          Join Us
        </Button>
      </div>
    </div>
  );
}
