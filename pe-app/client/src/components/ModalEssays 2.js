import React from "react";
import "../css/Modal.css";
import artworkimg from "./Rectangle.png";
import { Card, CardContent, Typography } from "@material-ui/core";
import Gallery from "./Carousel.js";

const Modal = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <div className="modal-body">
        </div>
        <div className="modal-title">
          Title!
        </div>
        <div className="modal-author">
          author
        </div>
        <div className="modal-date">
          date, responses
        </div>
        <div className="modal-tags">
          tag
        </div>
        <div className="modal-address">
          Mailing Address: Gary Farlow, ID: 222136
          Kirkland R+E A2-48-A, Po Box
          21787-4444, 4344 Broadriver Rd.,
          Columbia, 29210
        </div>
        <div className="modal-essay">
          Is it good for a person to eat sometimes? Yes, obviously it is. Is it good for a person to eat all the time? No, of  course not. Is it good to fast periodically? Yes. Is it good to never eat? No. The pendulum can swing all the way from gorging yourself to death, to starving yourself to death. Those are the two extremes of the pendulum: the yin and the yang, expansion and contraction, non-doing and doing. Everything has two extremes. Everything has gradations of this pendulum swing. If you go to extremes, you cannot survive. That’s how extreme the extremes are. For example, do you like hot weather? How about 6000°F? You’d be instantly vaporized. Do you like cold weather? How about absolute zero? The molecules of your body would not move.

          Do you like being close to another person? How about being so close that you’re never apart? You eat every meal together, you go everywhere together, and you do everything together.  When you talk on the phone, you always use a speakerphone so that both of you can partake in every conversation. You want to be so close that you’re the same person. How long do you think that could last?

          That’s one extreme in human relationships. The other extreme is that you want your own space. You do your own thing. You’re independent. You like being separate so that you always have something to share with each other when you are together. How independent are you? Well, you travel separately, you eat separately, and you live in separate houses. At what point are you so separate that no one can figure out if you’re having a relationship? You haven’t seen each other for years! Both of you haven’t seen each other for years! Both of these extremes will end up the same. Too close, too far away -- in either  case, you won’t be talking to each other before long. Everything has  its extremes, its yin and its yang.

          Now let’s get a little subtler. The 6,000 degree temperature doesn’t sound so good, and absolute zero doesn’t sound so interesting either. Neither does starving to death, nor eating until you are sick. The part about being so close to somebody that you are always together may sound pretty nice. You may at least like to give it a shot. If so, it is because your pendulum has been swung in the opposite direction far too long. You have had too much time alone -- too many dinners alone, too many movies alone, and too much traveling. In other words, your pendulum has swung off-center.

          The middle is the place where there is no energy pushing in either direction. The pendulum has been permitted to come to balance concerning food, relationships, sex, money, doing, not doing, and everything else. Everything has its yin and yang. The middle is the place in which these forces balance quietly. Indeed, unless you go out of  the middle, things tend to stay in peaceful harmony. If you want to understand the middle, you must take a closer look at what lies between the two extremes. This is because neither extreme can last. How long can a pendulum stay at one of its outermost positions? It can only remain there for a moment.

        </div>
        <div className="modal-carasoul">
          Other work by Gary Farlow
          <Gallery />
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">Close</button>
        </div>
      </div>
    </div>
  )
}
export default Modal;