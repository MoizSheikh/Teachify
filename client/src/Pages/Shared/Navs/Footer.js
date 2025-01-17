import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="footer">
      <div className="content">
        <div className="Con1">
          <div className="col2 col1">
            <div className="detail">
              Our Goal Is To Increase The Number Of Entrepreneurs And Give Them
              More Time To Pursue Their Passions.
            </div>
            <div className="lang">
              language:
              <select>
                <option>English</option>
                <option>Norsk Bokmål</option>
              </select>
            </div>
          </div>

          <div className="col2">
            <Link className="heading link" to="/helpCenter">
              Contact
            </Link>
            <Link to="/helpCenter" className="link">
              Help Center
            </Link>
          </div>
          <div className="col2">
            <div className="heading">Lectures</div>
            <Link to="#" className="link">
              MAT101
            </Link>
            <Link to="#" className="link">
              DAT159
            </Link>
            <Link to="#" className="link">
              INT503
            </Link>
            <Link to="#" className="link">
              MKS550
            </Link>
            <Link to="#" className="link">
              ING303
            </Link>
          </div>
        </div>
        <div className="Con2">
          <div className="innerCon1">
            <div>© 2020, Teachify</div>
            <Link to="terms" className="link">
              Terms of Service
            </Link>
            <Link to="policy" className="link">
              Privacy Policy
            </Link>
          </div>
          <div className="innerCon2">
            <Link to="www.instagram.com/itseasyplatform" className="link">
              <BsFacebook className="icon" />
            </Link>
            <Link to="www.instagram.com/itseasyplatform" className="link">
              <BsInstagram className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
