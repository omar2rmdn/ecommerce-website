import { FaHeart, FaRegHeart } from "react-icons/fa";
type LikeBtnProps = { isLiked: boolean; likeHandler: () => void };
import styles from "./styles.module.css";

const { likeBtn } = styles;
export default function LikeBtn({ isLiked, likeHandler }: LikeBtnProps) {
  return (
    <div onClick={likeHandler} className={likeBtn}>
      {isLiked ? <FaHeart size={22} color="red" /> : <FaRegHeart size={22} />}
    </div>
  );
}
