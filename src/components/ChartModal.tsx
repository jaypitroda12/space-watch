import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import { AsteroidData } from 'interfaces'
import { Chart, UserSerie } from 'react-charts'

interface ChartModalProps {
  isOpen: boolean
  data: UserSerie<AsteroidData>[]
  closeModal: () => void
}

export const ChartModal = ({ isOpen, data, closeModal }: ChartModalProps) => {
  const { onClose } = useDisclosure()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asteroid Observation Time vs Velocity</ModalHeader>
        <ModalCloseButton onClick={closeModal} />
        <ModalBody>
          <Chart
            options={{
              data,
              primaryAxis: { getValue: (datum) => datum.time },
              secondaryAxes: [{ getValue: (datum) => datum.velocity }],
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
