import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";
const override = css`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;
export default function Loader(props) {
  return props.enable ? (
    <div className="fixed cursor-wait top-0 left-0 z-50  h-screen w-screen bg-qosdark bg-opacity-50">
      <ScaleLoader color={"crimson"} loading={props.enable} css={override} />
    </div>
  ) : null;
}
