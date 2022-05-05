import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const BottomSheet: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ children, open, onClose }) => {
  const ref = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (open) {
      ref.current?.present();
    }
  }, [open]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        onDismiss={onClose}
        snapPoints={['90%']}
        handleComponent={null}
      >
        <View style={styles.container}>{children}</View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
});

export default BottomSheet;
