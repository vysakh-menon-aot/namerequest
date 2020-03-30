import Modal from '@/components/modals/pick-entity.vue'
import newReqModule from '@/store/new-request-module'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
const vuetify = new Vuetify()

localVue.use(Vuetify)

describe('name-input.vue', () => {
  let wrapper: any

  beforeEach( () => {
    wrapper = mount(Modal, {
      localVue,
      vuetify
    })
  })

  it('When the location is set to BC, it displays options for BC', () => {
    expect(wrapper.vm.tableData).toStrictEqual(wrapper.vm.tableDataBC)
  })

  it('When the location is not set to BC, it displays XPRO options', async () => {
    newReqModule.mutateLocation('CA')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tableData).toStrictEqual(wrapper.vm.tableDataXPRO)
  })
  it('clicking an entity sets the entityType and closes the modal', async (): Promise<void> => {
    wrapper.vm.showModal = true
    await wrapper.vm.$nextTick()
    let foreignCorp = wrapper.find('#XCR')
    foreignCorp.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.showModal).toBe(false)
    expect(newReqModule.entityType).toBe('XCR')
  })
})
