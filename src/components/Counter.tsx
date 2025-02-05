import { useSpring, animated } from '@react-spring/web';
import { Button, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { incremented, decremented, reset } from '../utils/counterSlice';

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const backgroundAnimation = useSpring({
    height: `${count}%`,
    config: { tension: 100, friction: 20 }
  });

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <animated.div
        style={{
          ...backgroundAnimation,
          backgroundColor: '#2196f3',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      />
      <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
        <Button variant="contained" size="small" onClick={() => dispatch(incremented())}>
          +
        </Button>
        <Typography>Count: {count}</Typography>
        <Button variant="contained" size="small" onClick={() => dispatch(decremented())}>
          -
        </Button>
        <Button variant="outlined" size="small" onClick={() => dispatch(reset())}>
          Reset
        </Button>
      </Stack>
    </div>
  );
};

export default Counter;