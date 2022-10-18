import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AlertBox from '../AlertBox.vue';

describe("AlertBox", () => {
  it("renders properly", () => {
    const wrapper = mount(AlertBox, { props: {
      show: true,
      type: 'error',
      
    }, 

  
  });
    expect(wrapper.text()).toContain("alert");
  });
});
