import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import InventoryIcon from '@mui/icons-material/Inventory';
import HailIcon from '@mui/icons-material/Hail';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import RadarIcon from '@mui/icons-material/Radar';
import PaidIcon from '@mui/icons-material/Paid';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import './OrderStatus.css';
import OrderModel from '../../../../models/OrderModel';
import OrderStatusModel from '../../../../models/OrderStatusModel';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgb(0 0 0) 0%, rgb(69 69 69) 50%, rgb(127 127 127) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient(136deg, rgb(0 0 0) 0%, rgb(69 69 69) 50%, rgb(127 127 127) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(136deg, rgb(0 0 0) 0%, rgb(69 69 69) 50%, rgb(127 127 127) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(136deg, rgb(0 0 0) 0%, rgb(69 69 69) 50%, rgb(127 127 127) 100%)',
  }),
}));

function ColorlibStepIconCOD(props: StepIconProps) {
  const { active, completed, className } = props;

  const CODIcons: { [index: string]: React.ReactElement } = {
    1: <FiberNewIcon />,
    2: <SettingsIcon />,
    3: <InventoryIcon />,
    4: <HailIcon />,
    5: <LocalShippingIcon />,
    6: <RadarIcon />,
    7: <PaidIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {CODIcons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function ColorlibStepIconVNPay(props: StepIconProps) {
  const { active, completed, className } = props;

  const VNPayIcons: { [index: string]: React.ReactElement } = {
    1: <PaidIcon />,
    2: <FiberNewIcon />,
    3: <SettingsIcon />,
    4: <InventoryIcon />,
    5: <HailIcon />,
    6: <LocalShippingIcon />,
    7: <RadarIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {VNPayIcons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const CODSteps = [
  'Mới',
  'Đang xử lý',
  'Đã đóng gói',
  'Shipper nhận hàng',
  'Đang giao hàng',
  'Đã được giao',
  'Đã thanh toán',
];

const VNPaySteps = [
  'Đã thanh toán',
  'Mới',
  'Đang xử lý',
  'Đã đóng gói',
  'Shipper nhận hàng',
  'Đang giao hàng',
  'Đã được giao',
];

interface OrderStatusProps {
  order?: OrderModel;
}

export default function OrderStatus(props: OrderStatusProps) {
  let activeStep = 0;

  if (props.order?.paymentMethod === 'COD') {
    if (props.order?.status === OrderStatusModel.NEW) {
      activeStep = 0;
    } else if (props.order?.status === OrderStatusModel.PROCESSING) {
      activeStep = 1;
    } else if (props.order?.status === OrderStatusModel.PACKAGED) {
      activeStep = 2;
    } else if (props.order?.status === OrderStatusModel.PICKED) {
      activeStep = 3;
    } else if (props.order?.status === OrderStatusModel.SHIPPING) {
      activeStep = 4;
    } else if (props.order?.status === OrderStatusModel.DELIVERED) {
      activeStep = 5;
    } else if (props.order?.status === OrderStatusModel.PAID) {
      activeStep = 6;
    }
  } else {
    if (props.order?.status === OrderStatusModel.PAID) {
      activeStep = 0;
    } else if (props.order?.status === OrderStatusModel.NEW) {
      activeStep = 1;
    } else if (props.order?.status === OrderStatusModel.PROCESSING) {
      activeStep = 2;
    } else if (props.order?.status === OrderStatusModel.PACKAGED) {
      activeStep = 3;
    } else if (props.order?.status === OrderStatusModel.PICKED) {
      activeStep = 4;
    } else if (props.order?.status === OrderStatusModel.SHIPPING) {
      activeStep = 5;
    } else if (props.order?.status === OrderStatusModel.DELIVERED) {
      activeStep = 6;
    }
  }

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {props.order?.paymentMethod === 'COD'
          ? CODSteps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIconCOD}>
                  {label}
                </StepLabel>
              </Step>
            ))
          : VNPaySteps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIconVNPay}>
                  {label}
                </StepLabel>
              </Step>
            ))}
      </Stepper>
    </Stack>
  );
}
