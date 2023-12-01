import styles from "./privacy.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Path } from "../constant";
import Locale, {
  getLang,
} from "../locales";

import ConfirmIcon from "../icons/confirm.svg";
import LoadingIcon from "../icons/three-dots.svg";
import CloseIcon from "../icons/close.svg";
import dynamic from "next/dynamic";
import { copyToClipboard } from "../utils";

const Markdown = dynamic(async () => (await import("./markdown")).Markdown, {
  loading: () => <LoadingIcon />,
});

export function PrivacyPage() {
  const navigate = useNavigate();
  const [mdText, setMdText] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showTerms, setShowTerms] = useState(true);
  const [privacyTerms, setPrivacyTerms] = useState<any>(null);

  useEffect(() => {
    const fetchPrivacyTerms = async () => {
      const lang = getLang();
      const response = await fetch("./privacy.json");
      const data = await response.json();
      setPrivacyTerms(data);
      const privacyPolicy = data[lang][0][1];
      setMdText(privacyPolicy);
      setPageTitle(data[lang][0][0]);
      setDescription(data[lang][0][2]); // Assuming the description is at index 2
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!privacyTerms) {
      fetchPrivacyTerms();
    }
  }, [privacyTerms]);

  const handleAgree = () => {
    const lang = getLang();
    const termsOfService = privacyTerms[lang][1][1];
    setShowTerms(false);
    setMdText(termsOfService);
    setPageTitle(privacyTerms[lang][1][0]);
    setDescription(privacyTerms[lang][1][2]); // Assuming the description is at index 2
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goChat = () => {
    navigate(Path.Chat);
  };

  const copy = () => {
    copyToClipboard(mdText);
  };

  return (
    <div className={styles["privacy-page"]}>
      <div className={`privacy-title ${styles["privacy-title"]}`}>
        {showTerms && (
          <div
            id="terms-title"
            className={`privacy-header-main-title ${styles["privacy-header-main-title"]} ${styles["scroll-title"]}`}
          ></div>
        )}
        <div
          id="privacy-title"
          className={`privacy-header-main-title ${styles["privacy-header-main-title"]}`}
        >
          {pageTitle}
        </div>
      </div>
      <div className={styles["privacy-content"]}>
        <div className={styles["markdown-body"]}>
          <Markdown content={mdText} />
        </div>
      </div>
      {showTerms ? (
        <div className={styles["privacy-actions"]}>
          <div className="window-action-button">
            <IconButton
              text={Locale.PrivacyPage.Confirm}
              icon={<ConfirmIcon />}
              onClick={handleAgree}
              bordered
            />
          </div>
          <div className="window-action-button">
            <IconButton
              text={Locale.UI.Cancel}
              icon={<CloseIcon />}
              bordered
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      ) : (
        <div className={styles["privacy-actions"]}>
          <div className="window-action-button">
            <IconButton
              text={Locale.UI.Close}
              icon={<ConfirmIcon />}
              onClick={goChat}
              bordered
            />
          </div>
        </div>
      )}
    </div>
  );
}
