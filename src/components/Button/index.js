import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    secondary = false,
    disable = false,
    large = false,
    small = false,
    children,
    className,
    leftIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const classes = cx('btn', {
        [className]: className,
        primary,
        secondary,
        disable,
        small,
        large,
    });
    const props = { onClick, ...passProps };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default Button;
