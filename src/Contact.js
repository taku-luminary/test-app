import { Form } from "react-router-dom";
import styles from "./Contact.module.css";
import { useState } from "react";


export default function Contact() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const clearAll = () => {
    setName(""); setEmail(""); setMessage("");
    setNameError(""); setEmailError(""); setMessageError("");
  };



  const handleSubmit = async (e) => {
    e.preventDefault(); 

    let hasError = false;

    // 名前バリデーションチェック
    if (name.trim() === "") {
      setNameError("お名前は必須です。");
      hasError = true;
    } else if (name.length > 30) {
      setNameError("お名前は30文字以内で入力してください。");
      hasError = true;
    } else {
      setNameError("");
    }

    // アドレスバリデーションチェック
    if (email.trim() === "") {
      setEmailError("メールアドレス必須です。");
      hasError = true;
    } else if (!emailRegex.test(email.trim())) {  
      setEmailError("メールアドレスの形式が正しくありません。");
      hasError = true;
    } else {
      setEmailError("");
    }

    // 本文バリデーションチェック
    if (message.trim() === "") {
      setMessageError("本文は必須です。");
      hasError = true;
    } else if (message.length > 500) {
      setMessageError("本文は500字以内で入力してください。");
      hasError = true;
    } else {
      setMessageError("");
    }
    
  if (hasError) return; 
    try {
      setIsSubmitting(true); 
      const response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",   
          headers: {
            "Content-Type": "application/json",  // JSON送信を宣言
          },
          body: JSON.stringify({                 // データをJSON形式に変換
            name: name,
            email: email,
            message: message,
          }),
        }
      );

      // 成功確認
      if (!response.ok) {
        throw new Error("送信に失敗しました。");
      }

      //  成功時の処理
      alert("送信しました。");
      clearAll();
    } catch (error) {
      alert("エラー：" + error.message);
    } finally {
      setIsSubmitting(false); // 送信終了
    }
  }
  

  return (
    <div className={styles.all}>
      <h3 className={styles.title}>問合わせフォーム</h3>

      {/* フォーム全体をまとめる（送信先はまだ未設定） */}
      <Form method="post" className={styles.form} onSubmit={handleSubmit}>
        {/* お名前 */}
        <div className={styles.row}>
          <label htmlFor="name" className={styles.label}>お名前</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            disabled={isSubmitting}
          />
        </div>

        {/* エラーメッセージ */}
        {nameError && <p className={styles.error}>{nameError}</p>}

        {/* メールアドレス */}
        <div className={styles.row}>
          <label htmlFor="email" className={styles.label}>メールアドレス</label>
          <input id="email" name="email" type="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting}/>
        </div>

        {/* エラーメッセージ */}
        {emailError && <p className={styles.error}>{emailError}</p>}

        {/* 本文 */}
        <div className={styles.row}>
          <label htmlFor="message" className={styles.label}>本文</label>
          <textarea id="message" name="message" rows="10" className={styles.textarea} value={message} onChange={(e) => setMessage(e.target.value)} disabled={isSubmitting}/>
        </div>

        {/* エラーメッセージ */}
        {messageError && <p className={styles.error}>{messageError}</p>}

        {/* ボタン */}
        <div className={styles.actions}>
          <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>送信</button>
          <button type="button" className={styles.btnSecondary} disabled={isSubmitting} onClick={clearAll}> クリア</button>
        </div>
      </Form>
    </div>
  );
}


