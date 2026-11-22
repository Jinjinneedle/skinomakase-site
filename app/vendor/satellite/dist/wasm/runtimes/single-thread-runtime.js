import { getNativeStructFieldLayout } from '../native-structs-from-js.js';
import { passRunDataToWasm } from '../run-data.js';
import { createRuntimeDispose } from './runtime-dispose.js';
export async function createSingleThreadRuntimeFromModule(wasmModule) {
    const runDataStructLayoutStringPointer = wasmModule._create_rundata_struct_layout_string_pointer();
    const runDataLayout = getNativeStructFieldLayout(runDataStructLayoutStringPointer, wasmModule);
    wasmModule._free(runDataStructLayoutStringPointer);
    const compute = (runData, runDataPointer) => {
        passRunDataToWasm(wasmModule, runDataLayout, runData, runDataPointer);
        wasmModule._compute(runDataPointer);
    };
    const runtime = {
        mode: 'single',
        module: wasmModule,
        compute,
        dispose: createRuntimeDispose(wasmModule),
        [Symbol.dispose]() {
            this.dispose();
        },
    };
    return runtime;
}
