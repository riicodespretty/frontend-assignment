import { h } from 'vue'
import ClientModal from '@/components/ClientModal.vue'
import type { ComponentProps } from 'vue-component-type-helpers'

export function showModal(props: ComponentProps<typeof ClientModal>) {
  const overlay = useOverlay()

  const modal = overlay.create(h(ClientModal, props))
  modal.open()

  return modal
}
