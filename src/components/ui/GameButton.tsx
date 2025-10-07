import Button from '@mui/material/Button';

interface GameButtonProps {
    children?: React.ReactNode;
    onClick: () => void;
    variant: 'contained' | 'outlined' | 'text';
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    size: 'small' | 'medium' | 'large';
}

export const GameButton = ({ children, ...props }: GameButtonProps) => {
    return <Button {...props}>{children}</Button>;
};

export default GameButton;
