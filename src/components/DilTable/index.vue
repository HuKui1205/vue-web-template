<template>
	<div class="st-table-index">
		<component :is="componentName" v-bind.sync="$attrs" v-on="$listeners"></component>
	</div>
</template>

<script>
	import stBaseTable from "./lib/tableAbility.vue";
	import stCommonTable from "./lib/tableCss.vue";
	export default {
		props: {
			type: {
				default: 'common',
			}
		},
		computed: {
			// 通过计算传如的type字符串
			// 生成对应类型的表格
			componentName() {
				let name = 'stBaseTable';
				switch (this.type) {
					case "common":
						name = "stCommonTable";
						break;
					case "base":
						name = "stBaseTable";
						break;
				}
				return name;
			}
		},
		components: {
			stBaseTable,
			stCommonTable
		}
	}
</script>
