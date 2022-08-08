import { FC } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import styles from './UserInfo.module.scss';

type UserInfoProps = {
  avatarUrl: string;
  fullName: string;
  additionalText: string;
}

export const UserInfo: FC<UserInfoProps> = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{dayjs(additionalText).locale('ru').format("dddd, MMMM D YYYY, HH:mm")}</span>
      </div>
    </div>
  );
};
