import React from 'react';
import { CircularProgress, Typography, Box, LinearProgress, keyframes, Chip } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Modality } from '../../types';
import { Check, PlayArrow, Pending } from '@mui/icons-material';

interface ModelProgress {
  name: string;
  status: 'completed' | 'current' | 'pending';
}

interface LoadingIndicatorProps {
  modality?: Modality;
  progress?: number;
  message?: string;
  tips?: string[];
  currentStep?: number;
  totalSteps?: number;
  modelProgress?: ModelProgress[];
}

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AnimatedBox = styled(Box)`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '600px',
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const ModalityIcon = styled('div')(({ theme }) => ({
  fontSize: '4rem',
  marginBottom: theme.spacing(2),
  animation: `${pulse} 2s ease-in-out infinite`,
  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.secondary.main,
  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  marginTop: theme.spacing(2),
  position: 'relative',
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundImage: `linear-gradient(45deg, 
      ${theme.palette.secondary.main} 25%, 
      ${theme.palette.secondary.dark} 50%, 
      ${theme.palette.secondary.main} 75%
    )`,
    backgroundSize: '200% 200%',
    animation: `${rotate} 2s linear infinite`,
  },
}));

const ModelProgressContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const ModelChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  padding: theme.spacing(1.5),
  backgroundColor: status === 'current' ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
  border: `1px solid ${status === 'completed' ? theme.palette.success.main : 
    status === 'current' ? theme.palette.secondary.main : 
    theme.palette.text.disabled}`,
  color: status === 'completed' ? theme.palette.success.main : 
    status === 'current' ? theme.palette.secondary.main : 
    theme.palette.text.disabled,
  '& .MuiChip-icon': {
    color: status === 'completed' ? theme.palette.success.main : 
      status === 'current' ? theme.palette.secondary.main : 
      theme.palette.text.disabled
  },
  '& .MuiChip-label': {
    fontWeight: status === 'current' ? 600 : 400
  }
}));

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  modality,
  progress,
  message = 'Processing...',
  tips = [
    'This might take a minute...',
    'AI models are working their magic...',
    'Almost there...',
    'Creating something amazing...',
  ],
  currentStep,
  totalSteps,
  modelProgress = [],
}) => {
  const theme = useTheme();
  const [currentTip, setCurrentTip] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tips.length]);

  const getModalityIcon = () => {
    switch (modality) {
      case Modality.Image:
        return '🖼️';
      case Modality.Video:
        return '🎥';
      case Modality.Audio:
        return '🎵';
      case Modality.Text:
        return '📝';
      case Modality.ThreeDimentional:
        return '🎮';
      case Modality.Sketch:
        return '✏️';
      default:
        return '⚡';
    }
  };

  return (
    <LoadingContainer>
      <ModalityIcon>{getModalityIcon()}</ModalityIcon>
      
      <StyledCircularProgress
        size={70}
        thickness={4}
      />

      {progress !== undefined && (
        <ProgressContainer>
          <StyledLinearProgress
            variant="determinate"
            value={progress}
          />
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              marginTop: 1,
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
            color="textSecondary"
          >
            {currentStep && totalSteps ? (
              <>Step {currentStep} of {totalSteps} ({Math.round(progress)}%)</>
            ) : (
              <>{Math.round(progress)}% Complete</>
            )}
          </Typography>
        </ProgressContainer>
      )}

      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          color: 'text.primary',
          marginTop: 1,
        }}
      >
        {message}
      </Typography>

      {modelProgress.length > 0 && (
        <ModelProgressContainer>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'left',
              fontWeight: 600,
              color: 'text.primary',
              marginBottom: 1,
            }}
          >
            Model Progress:
          </Typography>
          {modelProgress.map((model, index) => (
            <ModelChip
              key={index}
              theme={theme}
              label={model.name}
              status={model.status as "current" | "completed" | "pending"}
              icon={
                model.status === 'completed' ? <Check /> :
                model.status === 'current' ? <PlayArrow /> :
                <Pending />
              }
            />
          ))}
        </ModelProgressContainer>
      )}

      <AnimatedBox
        sx={{
          opacity: 0.9,
          padding: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          width: '100%',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {tips[currentTip]}
        </Typography>
      </AnimatedBox>
    </LoadingContainer>
  );
}; 